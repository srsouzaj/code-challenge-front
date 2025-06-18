import FormContainer from "@/components/Form";
import Services from "@/services";

export default async function EditPage({ params }: { params: { id: string } }) {
  const id = params.id;
  const { users } = Services();

  const user = await users.consultarUsuarioById(Number(id));

  console.log(user);

  return (
    <main className="container">
      <h1 className="text-xl font-bold mb-4">Usuário:</h1>
      <FormContainer user={user} />
    </main>
  );
}
