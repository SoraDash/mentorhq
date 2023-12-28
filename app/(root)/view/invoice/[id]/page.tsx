import CodeForm from './_components/CodeForm';

type ViewInvoiceProps = {
  params: {
    id: string;
  };
  searchParams: {
    code: string;
  };
};

const ViewInvoicePublicPage = (props: ViewInvoiceProps) => {
  const code = props.searchParams.code;

  return (
    <div className="flex flex-col min-h-screen">
      <div className="w-full max-w-xs m-auto bg-indigo-100 rounded p-5">
        <header>
          <img
            alt="Logo"
            className="w-20 mx-auto mb-5"
            src="https://img.icons8.com/fluent/344/year-of-tiger.png"
          />
        </header>
        {code !== '982-259-100' ? (
          <CodeForm code={code} />
        ) : (
          <div>You are looking at invoice {props.params.id} with code</div>
        )}
      </div>
    </div>
  );
};

export default ViewInvoicePublicPage;
