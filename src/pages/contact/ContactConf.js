import { useDispatch } from "react-redux";
import { popError, setErrorMessage, setLoading } from "../../store/AppReducer";
import { addRecent } from "../../store/ContactReducer";

export const ContactConf = (service) => {
  const dispatch = useDispatch();
  const {
    getContactService,
    postContactService,
    updateContactService,
    deleteContactService,
  } = service();

  const onLoadContacts = async () => {
    try {
      dispatch(setLoading(true));
      const result = await getContactService();
      return result;
    } catch (error) {
      throw error
    } finally {
      dispatch(setLoading(false));
    }
  };

  const onPostContact = async (data) => {
    try {
      dispatch(setLoading(true));
      return await postContactService(data);
    } catch (error) {
      dispatch(popError(true))
      dispatch(setErrorMessage(error.response.data.msg))
    } finally {
      dispatch(setLoading(false));
      dispatch(
        addRecent({
          id: data.id,
          data: { firstName: data.firstName, image: data.photo },
        })
      );
      onLoadContacts();
    }
  };

  const onUpdateContact = async (id, data) => {
    try {
      dispatch(setLoading(true));
      return await updateContactService(id, data);
    } catch (error) {
      throw error
    } finally {
      dispatch(setLoading(false));
      dispatch(addRecent({ id, data }));
      onLoadContacts();
    }
  };

  const onDeleteContact = async (id) => {
    try {
      dispatch(setLoading(true));
      return await deleteContactService(id);
    } catch (error) {
      dispatch(setErrorMessage(error))
        dispatch(popError(true))
    } finally {
      dispatch(setLoading(false));
    }
  };

  return {
    onLoadContacts,
    onPostContact,
    onUpdateContact,
    onDeleteContact,
  };
};
