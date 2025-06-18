import { useAddress } from "./apiServices/Address/useAddress";
import { useUsers } from "./apiServices/Users/useUsers";

const Services = () => {
  const users = new useUsers();
  const address = new useAddress();
  return { address, users };
};

export default Services;
