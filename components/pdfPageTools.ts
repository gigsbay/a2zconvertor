export function formatFileSize(bytes: number) {
  if (bytes < 1024 * 1024) {
    return `${Math.max(0.1, bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export function copyBytesToArrayBuffer(bytes: Uint8Array) {
  const buffer = new ArrayBuffer(bytes.byteLength);
  new Uint8Array(buffer).set(bytes);
  return buffer;
}

export function parsePageSelection(input: string, pageCount: number) {
  const selectedPages: number[] = [];
  const seenPages = new Set<number>();
  const parts = input
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);

  if (parts.length === 0) {
    throw new Error("Enter at least one page or page range.");
  }

  for (const part of parts) {
    const rangeMatch = part.match(/^(\d+)\s*-\s*(\d+)$/);
    const pageMatch = part.match(/^\d+$/);

    if (rangeMatch) {
      const start = Number(rangeMatch[1]);
      const end = Number(rangeMatch[2]);

      if (start > end) {
        throw new Error(`Invalid range "${part}". Use a start page before the end page.`);
      }

      for (let page = start; page <= end; page += 1) {
        addPage(page, pageCount, selectedPages, seenPages);
      }
    } else if (pageMatch) {
      addPage(Number(part), pageCount, selectedPages, seenPages);
    } else {
      throw new Error(`Could not understand "${part}". Try 1,3,5 or 2-4.`);
    }
  }

  return selectedPages;
}

function addPage(
  page: number,
  pageCount: number,
  selectedPages: number[],
  seenPages: Set<number>
) {
  if (page < 1 || page > pageCount) {
    throw new Error(`Page ${page} is outside this PDF's 1-${pageCount} range.`);
  }

  if (!seenPages.has(page)) {
    seenPages.add(page);
    selectedPages.push(page);
  }
}
