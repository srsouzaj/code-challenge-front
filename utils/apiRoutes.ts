const apiRoutes = {
  users: {
    url: () => "/users",
    byId: { url: (id: number) => `users/${id}` },
  },
  address: {
    url: (cep: string) => `${process.env.NEXT_PUBLIC_API_VIA_CEP}/${cep}/json`,
  },
};

export default apiRoutes;
