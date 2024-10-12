import withAuth from "@/components/withAuth";
import Header from "@/components/Header";

const ProtectedPage = () => {
  return (
    <div>
      <Header />
      <h1>Contenu Protégé</h1>
      <p>
        Ce contenu est protégé et n&apos;est visible que pour les utilisateurs authentifiés.
      </p>
    </div>
  );
};

export default withAuth(ProtectedPage);
