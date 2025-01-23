import React from 'react';
import { OrderSelectionProvider, useOrderSelection } from '@/context/OrderContext';
import { OrderProcessingProvider, useOrderProcessing } from '@/context/OrderProcessingContext';
import TableContent from '@/components/ui/TableContent';

const TablePage = () => {
  return (
    <OrderProcessingProvider>
      <OrderSelectionProvider>
        <TableContent />
      </OrderSelectionProvider>
    </OrderProcessingProvider>
  );
};

export default TablePage;