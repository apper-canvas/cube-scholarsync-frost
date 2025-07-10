const assignmentService = {
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
          { field: { Name: "class_id" } },
          { field: { Name: "category" } },
          { field: { Name: "points_possible" } },
          { field: { Name: "due_date" } },
          { field: { Name: "weight" } }
        ]
      };
      
      const response = await apperClient.fetchRecords('assignment', params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }
      
      // Map database fields to UI format
      return response.data.map(assignment => ({
        Id: assignment.Id,
        name: assignment.Name,
        classId: assignment.class_id,
        category: assignment.category,
        pointsPossible: assignment.points_possible,
        dueDate: assignment.due_date,
        weight: assignment.weight
      }));
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching assignments:", error?.response?.data?.message);
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
          { field: { Name: "class_id" } },
          { field: { Name: "category" } },
          { field: { Name: "points_possible" } },
          { field: { Name: "due_date" } },
          { field: { Name: "weight" } }
        ]
      };
      
      const response = await apperClient.getRecordById('assignment', id, params);
      
      if (!response || !response.data) {
        return null;
      }
      
      const assignment = response.data;
      return {
        Id: assignment.Id,
        name: assignment.Name,
        classId: assignment.class_id,
        category: assignment.category,
        pointsPossible: assignment.points_possible,
        dueDate: assignment.due_date,
        weight: assignment.weight
      };
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching assignment with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  },

  create: async (assignmentData) => {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      // Map UI fields to database fields (only Updateable fields)
      const params = {
        records: [{
          Name: assignmentData.name,
          class_id: assignmentData.classId,
          category: assignmentData.category,
          points_possible: assignmentData.pointsPossible,
          due_date: assignmentData.dueDate,
          weight: assignmentData.weight
        }]
      };
      
      const response = await apperClient.createRecord('assignment', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create assignment:${JSON.stringify(failedRecords)}`);
          throw new Error(failedRecords[0].message || 'Failed to create assignment');
        }
        
        const successfulRecord = response.results.find(result => result.success);
        if (successfulRecord) {
          const assignment = successfulRecord.data;
          return {
            Id: assignment.Id,
            name: assignment.Name,
            classId: assignment.class_id,
            category: assignment.category,
            pointsPossible: assignment.points_possible,
            dueDate: assignment.due_date,
            weight: assignment.weight
          };
        }
      }
      
      throw new Error('No data returned from create operation');
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating assignment:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw error;
    }
  },

  update: async (id, assignmentData) => {
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
          Name: assignmentData.name,
          class_id: assignmentData.classId,
          category: assignmentData.category,
          points_possible: assignmentData.pointsPossible,
          due_date: assignmentData.dueDate,
          weight: assignmentData.weight
        }]
      };
      
      const response = await apperClient.updateRecord('assignment', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to update assignment:${JSON.stringify(failedRecords)}`);
          throw new Error(failedRecords[0].message || 'Failed to update assignment');
        }
        
        const successfulRecord = response.results.find(result => result.success);
        if (successfulRecord) {
          const assignment = successfulRecord.data;
          return {
            Id: assignment.Id,
            name: assignment.Name,
            classId: assignment.class_id,
            category: assignment.category,
            pointsPossible: assignment.points_possible,
            dueDate: assignment.due_date,
            weight: assignment.weight
          };
        }
      }
      
      throw new Error('No data returned from update operation');
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating assignment:", error?.response?.data?.message);
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
      
      const response = await apperClient.deleteRecord('assignment', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to delete assignment:${JSON.stringify(failedRecords)}`);
          throw new Error(failedRecords[0].message || 'Failed to delete assignment');
        }
        
        return true;
      }
      
      return false;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting assignment:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw error;
    }
  }
};

export default assignmentService;