/* eslint-disable @typescript-eslint/no-explicit-any */
import FormContainer from "@/components/Form";
import Services from "@/services";

interface Params {
  id: string;
}

interface Props {
  params: Params;
}

export default async function EditPage(props: Props | any) {
  const params = await props.params;
  const { id } = params;

  const { users } = Services();

  const user = await users.consultarUsuarioById(Number(id));

  return (
    <main className="container">
      <h1 className="text-xl font-bold mb-4">Usuário:</h1>
      <FormContainer user={user} />
    </main>
  );
}
