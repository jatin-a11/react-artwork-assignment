import React, { useEffect, useRef, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';


const PrimeDataTable = DataTable as any;

interface Artwork {
  id: number;
  title: string;
  place_of_origin: string;
  artist_display: string;
  inscriptions: string;
  date_start: number;
  date_end: number;
}

const ROWS_PER_PAGE = 12;

const App: React.FC = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0); // PrimeReact is 0-based
  const [selectedRows, setSelectedRows] = useState<Artwork[]>([]);
  const [selectCount, setSelectCount] = useState<number | null>(null);

  const overlayRef = useRef<OverlayPanel>(null);

  const fetchArtworks = async (pageIndex: number) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.artic.edu/api/v1/artworks?page=${pageIndex + 1}`
      );
      const json = await res.json();
      setArtworks(json.data);
      setTotalRecords(json.pagination.total);
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArtworks(page);
  }, [page]);

  const onPageChange = (event: any) => {
    setPage(event.page ?? 0);
  };

  const onCustomSelectSubmit = () => {
    if (!selectCount || selectCount <= 0) return;
    setSelectedRows(artworks.slice(0, selectCount));
    overlayRef.current?.hide();
  };

  const selectionHeader = (
    <div className="flex align-items-center">
      <Button
        type="button"
        icon="pi pi-chevron-down"
        className="p-button-text p-0"
        onClick={(e) => overlayRef.current?.toggle(e)}
      />
      <OverlayPanel ref={overlayRef}>
        <div className="flex flex-column gap-2">
          <InputNumber
            value={selectCount}
            onValueChange={(e) => setSelectCount(e.value ?? null)}
            placeholder="Select rows"
          />
          <Button label="Submit" size="small" onClick={onCustomSelectSubmit} />
        </div>
      </OverlayPanel>
    </div>
  );

  const paginatorTemplate = {
    layout: 'CurrentPageReport PrevPageLink PageLinks NextPageLink',
    CurrentPageReport: (options: any) => (
      <span style={{ fontSize: '13px', color: '#6b7280' }}>
        Showing {options.first} to {options.last} of{' '}
        <b>{options.totalRecords}</b> entries
      </span>
    ),
  };

  return (
    <div className="p-4">
      <div style={{ marginBottom: '8px', fontSize: '14px', color: '#6b7280' }}>
        Selected:{' '}
        <span style={{ color: '#3b82f6', fontWeight: 500 }}>
          {selectedRows.length}
        </span>{' '}
        rows
      </div>

      <PrimeDataTable
        value={artworks}
        lazy
        paginator
        paginatorTemplate={paginatorTemplate}
        first={page * ROWS_PER_PAGE}
        rows={ROWS_PER_PAGE}
        totalRecords={totalRecords}
        onPage={onPageChange}
        loading={loading}
        selection={selectedRows}
        onSelectionChange={(e: any) => setSelectedRows(e.value)}
        dataKey="id"
        tableStyle={{ minWidth: '50rem' }}
        className="p-datatable-sm"
      >
        <Column
          selectionMode="multiple"
          header={selectionHeader}
          headerStyle={{ width: '3rem' }}
        />
        <Column field="title" header="TITLE" />
        <Column field="place_of_origin" header="PLACE OF ORIGIN" />
        <Column field="artist_display" header="ARTIST" />
        <Column field="inscriptions" header="INSCRIPTIONS" />
        <Column field="date_start" header="START DATE" />
        <Column field="date_end" header="END DATE" />
      </PrimeDataTable>
    </div>
  );
};

export default App;
