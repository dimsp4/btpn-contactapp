import { useDeps } from "../context/DependencyContext";

const ContactService = () => {
  const { apiClient } = useDeps();

  const getContactService = async () => {
    try {
      return await apiClient({
        method: "get",
      });
    } catch (error) {
      throw error;
    }
  };

  const postContactService = async (data) => {
    try {
      return await apiClient({
        method: "post",
        data
      });
    } catch (error) {
      throw error;
    }
  };

  const updateContactService = async (id, data) => {
    try {
      return await apiClient({
        url: `/${id}`,
        method: "put",
        data
      });
    } catch (error) {
      throw error;
    }
  };

  const deleteContactService = async (id) => {
    try {
      return await apiClient({
        url: `/${id}`,
        method: "delete",
      });
    } catch (error) {
      throw error;
    }
  };

  return {
    getContactService,
    postContactService,
    updateContactService,
    deleteContactService
  }
};

export default ContactService
