import { getExtractions } from '@/actions/getExtraction';
import TopMainContent from '@/components/top-main-content';
import { DataTable } from '@/components/ui/data-table';
import { Metadata } from 'next';
import React from 'react';
import {
  categories,
  columns,
  columnsWithoutStatus,
  Extraction,
  statuses,
} from './columns';

export const metadata: Metadata = {
  title: 'GenIO | Dashboard',
  description: 'This is dashboard',
};

interface DashboardPageProps {
  children: React.ReactNode;
}

const DashboardPage = async ({ children }: DashboardPageProps) => {
  const { currentExtractions, finishedExtractions } = await getExtractions();

  return (
    <>
      <TopMainContent title="Dashboard" displayUploadButton />
      <div className="m-8 flex flex-col flex-grow items-center justify-center space-y-12 2xl:space-y-20">
        <DataTable
          title="Documents in Pipelines"
          emptyMessage="No documents in pipelines"
          filterColumn={{
            columnId: 'filename',
            placeholder: 'Filter by file name',
          }}
          columns={columns}
          categories={categories}
          statuses={statuses}
          data={currentExtractions as Extraction[]}
        />
        <DataTable
          title="Latest Data Extractions"
          emptyMessage="No data extractions"
          filterColumn={{
            columnId: 'filename',
            placeholder: 'Filter by file name',
          }}
          columns={columnsWithoutStatus}
          categories={categories}
          statuses={statuses}
          data={finishedExtractions as Extraction[]}
        />
      </div>
    </>
  );
};

export default DashboardPage;
