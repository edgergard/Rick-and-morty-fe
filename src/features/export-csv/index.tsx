import { Download } from 'lucide-react';
import type { CharacterPreview } from '@/entities/character';
import { downloadFile, toCsv } from '@/shared/lib';
import { Button } from '@/shared/ui';

function exportCharactersCsv(characters: CharacterPreview[], filename = 'characters.csv') {
  const csv = toCsv(characters, [
    { header: 'id', value: (c) => c.id },
    { header: 'name', value: (c) => c.name },
    { header: 'status', value: (c) => c.status },
    { header: 'species', value: (c) => c.species },
    { header: 'type', value: (c) => c.type },
    { header: 'gender', value: (c) => c.gender },
    { header: 'origin', value: (c) => c.origin.name },
    { header: 'location', value: (c) => c.location.name },
    { header: 'first_episode', value: (c) => c.episode[0]?.episode },
    { header: 'episodes', value: (c) => c.episode.length },
    { header: 'image', value: (c) => c.image },
  ]);
  downloadFile(csv, filename, 'text/csv;charset=utf-8');
}

export function ExportCsvButton({
  characters,
  page,
}: {
  characters: CharacterPreview[];
  page: number;
}) {
  return (
    <Button
      variant="outline"
      disabled={!characters.length}
      onClick={() => exportCharactersCsv(characters, `characters-page-${page}.csv`)}
      title="Download this page as CSV"
    >
      <Download className="size-4" />
      <span className="hidden sm:inline">Export CSV</span>
    </Button>
  );
}
