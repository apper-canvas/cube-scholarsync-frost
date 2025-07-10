const classService = {
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
          { field: { Name: "subject" } },
          { field: { Name: "section" } },
          { field: { Name: "schedule" } },
          { field: { Name: "room" } },
          { field: { Name: "student_ids" } }
        ]
      };
      
      const response = await apperClient.fetchRecords('class', params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }
      
      // Map database fields to UI format
      return response.data.map(classItem => ({
        Id: classItem.Id,
        name: classItem.Name,
        subject: classItem.subject,
        section: classItem.section,
        schedule: classItem.schedule,
        room: classItem.room,
        studentIds: classItem.student_ids ? classItem.student_ids.split(',').map(id => parseInt(id.trim())).filter(id => !isNaN(id)) : []
      }));
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching classes:", error?.response?.data?.message);
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
          { field: { Name: "subject" } },
          { field: { Name: "section" } },
          { field: { Name: "schedule" } },
          { field: { Name: "room" } },
          { field: { Name: "student_ids" } }
        ]
      };
      
      const response = await apperClient.getRecordById('class', id, params);
      
      if (!response || !response.data) {
        return null;
      }
      
      const classItem = response.data;
      return {
        Id: classItem.Id,
        name: classItem.Name,
        subject: classItem.subject,
        section: classItem.section,
        schedule: classItem.schedule,
        room: classItem.room,
        studentIds: classItem.student_ids ? classItem.student_ids.split(',').map(id => parseInt(id.trim())).filter(id => !isNaN(id)) : []
      };
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching class with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  },

  create: async (classData) => {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      // Map UI fields to database fields (only Updateable fields)
      const params = {
        records: [{
          Name: classData.name,
          subject: classData.subject,
          section: classData.section || '',
          schedule: classData.schedule,
          room: classData.room,
          student_ids: (classData.studentIds || []).join(',')
        }]
      };
      
      const response = await apperClient.createRecord('class', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create class:${JSON.stringify(failedRecords)}`);
          throw new Error(failedRecords[0].message || 'Failed to create class');
        }
        
        const successfulRecord = response.results.find(result => result.success);
        if (successfulRecord) {
          const classItem = successfulRecord.data;
          return {
            Id: classItem.Id,
            name: classItem.Name,
            subject: classItem.subject,
            section: classItem.section,
            schedule: classItem.schedule,
            room: classItem.room,
            studentIds: classItem.student_ids ? classItem.student_ids.split(',').map(id => parseInt(id.trim())).filter(id => !isNaN(id)) : []
          };
        }
      }
      
      throw new Error('No data returned from create operation');
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating class:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw error;
    }
  },

  update: async (id, classData) => {
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
          Name: classData.name,
          subject: classData.subject,
          section: classData.section || '',
          schedule: classData.schedule,
          room: classData.room,
          student_ids: (classData.studentIds || []).join(',')
        }]
      };
      
      const response = await apperClient.updateRecord('class', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to update class:${JSON.stringify(failedRecords)}`);
          throw new Error(failedRecords[0].message || 'Failed to update class');
        }
        
        const successfulRecord = response.results.find(result => result.success);
        if (successfulRecord) {
          const classItem = successfulRecord.data;
          return {
            Id: classItem.Id,
            name: classItem.Name,
            subject: classItem.subject,
            section: classItem.section,
            schedule: classItem.schedule,
            room: classItem.room,
            studentIds: classItem.student_ids ? classItem.student_ids.split(',').map(id => parseInt(id.trim())).filter(id => !isNaN(id)) : []
          };
        }
      }
      
      throw new Error('No data returned from update operation');
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating class:", error?.response?.data?.message);
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
      
      const response = await apperClient.deleteRecord('class', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to delete class:${JSON.stringify(failedRecords)}`);
          throw new Error(failedRecords[0].message || 'Failed to delete class');
        }
        
        return true;
      }
      
      return false;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting class:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw error;
    }
  }
};

export default classService;