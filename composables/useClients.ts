import { useToast } from "#imports";

export function useClient() {
  const toast = useToast();

  const clients = ref([]);

  const clientFormState = useState("client-formstate", () => ({
    name: "",
    contact_person: "",
    phone_number: "",
    email: "",
    address: "",
    category: "",
    clients_supplied: [],
    notes: "",
    last_contact_date: ""
    }));

  const getAllClients = async () => {
    try {
      const response = await $fetch<IApiResponse>("/api/clients");
      clients.value = response.data;

      if (!response.success) {
        toast.add({
          title: "Error",
          description: response.message || "Failed to fetch clients.",
          color: "red",
        });
        return null;
      }

      return response.data;
    } catch (error) {
      console.error("Error in getAllClients:", error);
      toast.add({
        title: "Error",
        description: "Failed to fetch clients.",
        color: "red",
      });
      throw error;
    }
  };

  const createClient = async (clientData: any) => {
    try {
      const response = await $fetch<IApiResponse>("/api/clients", {
        method: "POST",
        body: clientData,
      });

      if (!response.success) {
        toast.add({
          title: "Error",
          description: response.message || "Failed to create client.",
          color: "red",
        });
        return null;
      }

      toast.add({
        title: "Success",
        description: "Client created successfully!",
        color: "green",
      });
      return response.data;
    } catch (error) {
      console.error("Error in createClient:", error);
      toast.add({
        title: "Error",
        description: "Failed to create client.",
        color: "red",
      });
      throw error;
    }
  };

  const updateClient = async (id: string, clientData: any) => {
    try {
      const response = await $fetch<IApiResponse>(`/api/clients?id=${id}`, {
        method: "PUT",
        body: clientData,
      });

      if (!response.success) {
        toast.add({
          title: "Error",
          description: response.message || "Failed to update client.",
          color: "red",
        });
        return null;
      }

      toast.add({
        title: "Success",
        description: "Client updated successfully!",
        color: "green",
      });
      return response.data;
    } catch (error) {
      console.error("Error in updateClient:", error);
      toast.add({
        title: "Error",
        description: "Failed to update client.",
        color: "red",
      });
      throw error;
    }
  };

  const deleteClient = async (id: string) => {
    try {
      const response = await $fetch<IApiResponse>(`/api/clients?id=${id}`, {
        method: "DELETE",
      });

      if (!response.success) {
        toast.add({
          title: "Error",
          description: response.message || "Failed to delete client.",
          color: "red",
        });
        return null;
      }

      toast.add({
        title: "Success",
        description: "Client deleted successfully!",
        color: "green",
      });
      return response;
    } catch (error) {
      console.error("Error in deleteClient:", error);
      toast.add({
        title: "Error",
        description: "Failed to delete client.",
        color: "red",
      });
      throw error;
    }
  };

  return {
    clients,
    clientFormState,
    getAllClients,
    createClient,
    updateClient,
    deleteClient,
  };
}
