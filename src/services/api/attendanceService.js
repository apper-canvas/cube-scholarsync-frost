const attendanceService = {
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
          { field: { Name: "class_id" } },
          { field: { Name: "date" } },
          { field: { Name: "status" } },
          { field: { Name: "reason" } }
        ]
      };
      
      const response = await apperClient.fetchRecords('attendance', params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }
      
      // Map database fields to UI format
      return response.data.map(attendance => ({
        Id: attendance.Id,
        studentId: attendance.student_id,
        classId: attendance.class_id,
        date: attendance.date,
        status: attendance.status,
        reason: attendance.reason
      }));
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching attendance:", error?.response?.data?.message);
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
          { field: { Name: "class_id" } },
          { field: { Name: "date" } },
          { field: { Name: "status" } },
          { field: { Name: "reason" } }
        ]
      };
      
      const response = await apperClient.getRecordById('attendance', id, params);
      
      if (!response || !response.data) {
        return null;
      }
      
      const attendance = response.data;
      return {
        Id: attendance.Id,
        studentId: attendance.student_id,
        classId: attendance.class_id,
        date: attendance.date,
        status: attendance.status,
        reason: attendance.reason
      };
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching attendance with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  },

  create: async (attendanceData) => {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      // Map UI fields to database fields (only Updateable fields)
      const params = {
        records: [{
          Name: `Attendance for ${attendanceData.date}`,
          student_id: attendanceData.studentId,
          class_id: attendanceData.classId,
          date: attendanceData.date,
          status: attendanceData.status,
          reason: attendanceData.reason || ''
        }]
      };
      
      const response = await apperClient.createRecord('attendance', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create attendance:${JSON.stringify(failedRecords)}`);
          throw new Error(failedRecords[0].message || 'Failed to create attendance');
        }
        
        const successfulRecord = response.results.find(result => result.success);
        if (successfulRecord) {
          const attendance = successfulRecord.data;
          return {
            Id: attendance.Id,
            studentId: attendance.student_id,
            classId: attendance.class_id,
            date: attendance.date,
            status: attendance.status,
            reason: attendance.reason
          };
        }
      }
      
      throw new Error('No data returned from create operation');
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating attendance:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw error;
    }
  },

  update: async (id, attendanceData) => {
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
          Name: `Attendance for ${attendanceData.date}`,
          student_id: attendanceData.studentId,
          class_id: attendanceData.classId,
          date: attendanceData.date,
          status: attendanceData.status,
          reason: attendanceData.reason || ''
        }]
      };
      
      const response = await apperClient.updateRecord('attendance', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to update attendance:${JSON.stringify(failedRecords)}`);
          throw new Error(failedRecords[0].message || 'Failed to update attendance');
        }
        
        const successfulRecord = response.results.find(result => result.success);
        if (successfulRecord) {
          const attendance = successfulRecord.data;
          return {
            Id: attendance.Id,
            studentId: attendance.student_id,
            classId: attendance.class_id,
            date: attendance.date,
            status: attendance.status,
            reason: attendance.reason
          };
        }
      }
      
      throw new Error('No data returned from update operation');
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating attendance:", error?.response?.data?.message);
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
      
      const response = await apperClient.deleteRecord('attendance', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to delete attendance:${JSON.stringify(failedRecords)}`);
          throw new Error(failedRecords[0].message || 'Failed to delete attendance');
        }
        
        return true;
      }
      
      return false;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting attendance:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw error;
    }
  }
};

export default attendanceService;