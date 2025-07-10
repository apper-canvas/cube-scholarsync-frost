const gradeService = {
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
          { field: { Name: "student_id" } },
          { field: { Name: "assignment_id" } },
          { field: { Name: "score" } },
          { field: { Name: "submitted_date" } },
          { field: { Name: "comments" } }
        ]
      };
      
      const response = await apperClient.fetchRecords('grade', params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }
      
      // Map database fields to UI format
      return response.data.map(grade => ({
        Id: grade.Id,
        studentId: grade.student_id,
        assignmentId: grade.assignment_id,
        score: grade.score,
        submittedDate: grade.submitted_date,
        comments: grade.comments
      }));
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching grades:", error?.response?.data?.message);
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
          { field: { Name: "student_id" } },
          { field: { Name: "assignment_id" } },
          { field: { Name: "score" } },
          { field: { Name: "submitted_date" } },
          { field: { Name: "comments" } }
        ]
      };
      
      const response = await apperClient.getRecordById('grade', id, params);
      
      if (!response || !response.data) {
        return null;
      }
      
      const grade = response.data;
      return {
        Id: grade.Id,
        studentId: grade.student_id,
        assignmentId: grade.assignment_id,
        score: grade.score,
        submittedDate: grade.submitted_date,
        comments: grade.comments
      };
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching grade with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  },

  create: async (gradeData) => {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      // Map UI fields to database fields (only Updateable fields)
      const params = {
        records: [{
          Name: `Grade for Student ${gradeData.studentId}`,
          student_id: gradeData.studentId,
          assignment_id: gradeData.assignmentId,
          score: gradeData.score,
          submitted_date: gradeData.submittedDate,
          comments: gradeData.comments || ''
        }]
      };
      
      const response = await apperClient.createRecord('grade', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create grade:${JSON.stringify(failedRecords)}`);
          throw new Error(failedRecords[0].message || 'Failed to create grade');
        }
        
        const successfulRecord = response.results.find(result => result.success);
        if (successfulRecord) {
          const grade = successfulRecord.data;
          return {
            Id: grade.Id,
            studentId: grade.student_id,
            assignmentId: grade.assignment_id,
            score: grade.score,
            submittedDate: grade.submitted_date,
            comments: grade.comments
          };
        }
      }
      
      throw new Error('No data returned from create operation');
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating grade:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw error;
    }
  },

  update: async (id, gradeData) => {
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
          Name: `Grade for Student ${gradeData.studentId}`,
          student_id: gradeData.studentId,
          assignment_id: gradeData.assignmentId,
          score: gradeData.score,
          submitted_date: gradeData.submittedDate,
          comments: gradeData.comments || ''
        }]
      };
      
      const response = await apperClient.updateRecord('grade', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to update grade:${JSON.stringify(failedRecords)}`);
          throw new Error(failedRecords[0].message || 'Failed to update grade');
        }
        
        const successfulRecord = response.results.find(result => result.success);
        if (successfulRecord) {
          const grade = successfulRecord.data;
          return {
            Id: grade.Id,
            studentId: grade.student_id,
            assignmentId: grade.assignment_id,
            score: grade.score,
            submittedDate: grade.submitted_date,
            comments: grade.comments
          };
        }
      }
      
      throw new Error('No data returned from update operation');
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating grade:", error?.response?.data?.message);
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
      
      const response = await apperClient.deleteRecord('grade', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to delete grade:${JSON.stringify(failedRecords)}`);
          throw new Error(failedRecords[0].message || 'Failed to delete grade');
        }
        
        return true;
      }
      
      return false;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting grade:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw error;
    }
  }
};

export default gradeService;