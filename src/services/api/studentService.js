const studentService = {
  getAll: async () => {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "first_name" } },
          { field: { Name: "last_name" } },
          { field: { Name: "email" } },
          { field: { Name: "date_of_birth" } },
          { field: { Name: "enrollment_date" } },
          { field: { Name: "grade_level" } },
          { field: { Name: "student_id" } },
          { field: { Name: "photo_url" } }
        ]
      };
      
      const response = await apperClient.fetchRecords('student', params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }
      
      // Map database fields to UI format
      return response.data.map(student => ({
        Id: student.Id,
        firstName: student.first_name,
        lastName: student.last_name,
        email: student.email,
        dateOfBirth: student.date_of_birth,
        enrollmentDate: student.enrollment_date,
        gradeLevel: student.grade_level,
        studentId: student.student_id,
        photoUrl: student.photo_url
      }));
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching students:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return [];
    }
  },

  getById: async (id) => {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "first_name" } },
          { field: { Name: "last_name" } },
          { field: { Name: "email" } },
          { field: { Name: "date_of_birth" } },
          { field: { Name: "enrollment_date" } },
          { field: { Name: "grade_level" } },
          { field: { Name: "student_id" } },
          { field: { Name: "photo_url" } }
        ]
      };
      
      const response = await apperClient.getRecordById('student', id, params);
      
      if (!response || !response.data) {
        return null;
      }
      
      const student = response.data;
      return {
        Id: student.Id,
        firstName: student.first_name,
        lastName: student.last_name,
        email: student.email,
        dateOfBirth: student.date_of_birth,
        enrollmentDate: student.enrollment_date,
        gradeLevel: student.grade_level,
        studentId: student.student_id,
        photoUrl: student.photo_url
      };
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching student with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  },

  create: async (studentData) => {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      // Map UI fields to database fields (only Updateable fields)
      const params = {
        records: [{
          Name: `${studentData.firstName} ${studentData.lastName}`,
          first_name: studentData.firstName,
          last_name: studentData.lastName,
          email: studentData.email,
          date_of_birth: studentData.dateOfBirth,
          enrollment_date: studentData.enrollmentDate,
          grade_level: studentData.gradeLevel,
          student_id: studentData.studentId,
          photo_url: studentData.photoUrl || ''
        }]
      };
      
      const response = await apperClient.createRecord('student', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create student:${JSON.stringify(failedRecords)}`);
          throw new Error(failedRecords[0].message || 'Failed to create student');
        }
        
        const successfulRecord = response.results.find(result => result.success);
        if (successfulRecord) {
          const student = successfulRecord.data;
          return {
            Id: student.Id,
            firstName: student.first_name,
            lastName: student.last_name,
            email: student.email,
            dateOfBirth: student.date_of_birth,
            enrollmentDate: student.enrollment_date,
            gradeLevel: student.grade_level,
            studentId: student.student_id,
            photoUrl: student.photo_url
          };
        }
      }
      
      throw new Error('No data returned from create operation');
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating student:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw error;
    }
  },

  update: async (id, studentData) => {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      // Map UI fields to database fields (only Updateable fields)
      const params = {
        records: [{
          Id: parseInt(id),
          Name: `${studentData.firstName} ${studentData.lastName}`,
          first_name: studentData.firstName,
          last_name: studentData.lastName,
          email: studentData.email,
          date_of_birth: studentData.dateOfBirth,
          enrollment_date: studentData.enrollmentDate,
          grade_level: studentData.gradeLevel,
          student_id: studentData.studentId,
          photo_url: studentData.photoUrl || ''
        }]
      };
      
      const response = await apperClient.updateRecord('student', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to update student:${JSON.stringify(failedRecords)}`);
          throw new Error(failedRecords[0].message || 'Failed to update student');
        }
        
        const successfulRecord = response.results.find(result => result.success);
        if (successfulRecord) {
          const student = successfulRecord.data;
          return {
            Id: student.Id,
            firstName: student.first_name,
            lastName: student.last_name,
            email: student.email,
            dateOfBirth: student.date_of_birth,
            enrollmentDate: student.enrollment_date,
            gradeLevel: student.grade_level,
            studentId: student.student_id,
            photoUrl: student.photo_url
          };
        }
      }
      
      throw new Error('No data returned from update operation');
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating student:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw error;
    }
  },

  delete: async (id) => {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const params = {
        RecordIds: [parseInt(id)]
      };
      
      const response = await apperClient.deleteRecord('student', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to delete student:${JSON.stringify(failedRecords)}`);
          throw new Error(failedRecords[0].message || 'Failed to delete student');
        }
        
        return true;
      }
      
      return false;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting student:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw error;
    }
  }
};

export default studentService;