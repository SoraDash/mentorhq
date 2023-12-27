import React from 'react';

type Props = {
  params: {
    id: string;
  };
};

function SingleInvoicePage({ params }: Props) {
  return <div>SingleInvoicePage {params.id}</div>;
}

export default SingleInvoicePage;
