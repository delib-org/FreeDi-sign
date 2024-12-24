import { getUsersData } from "../db/user/getUserData";

export class CSV {
    static convertToCSV(data: Record<string, unknown>[]): string {
        if (data.length === 0) return '';

        // Get headers from the first object
        const headers = this.getHeaders(data);

        // Create CSV header row with explicit encoding
        const csvRows = [
            // Add Excel-specific UTF-8 marker
            '\ufeff' + headers.join(',')
        ];

        // Create data rows with enhanced encoding handling
        for (const row of data) {
            const values = headers.map(header => {
                const value = row[header];

                // Enhanced handling for Hebrew and special characters
                if (value === null || value === undefined) return '';
                if (value instanceof Date) return value.toISOString();
                if (typeof value === 'string') {
                    // Double escape quotes and ensure proper encoding
                    return `"${value.replace(/"/g, '""')}"`;
                }
                return value;
            });

            csvRows.push(values.join(','));
        }

        return csvRows.join('\r\n'); // Use Windows-style line endings for better Excel compatibility
    }

    static getHeaders(data: Record<string, unknown>[]): string[] {
        if (data.length === 0) return [];
        const headers = new Set<string>();
        for (const row of data) {
            for (const header of Object.keys(row)) {
                headers.add(header);
            }
        }
        return Array.from(headers);
    }

    static async downloadCSV(documentId: string|undefined): Promise<void> {
        try {
            if(!documentId) throw new Error("Document id is missing");
            // Fetch data from the database
            const data = await getUsersData(documentId);

            // Convert data to CSV format
            const csvContent = this.convertToCSV(data);

            // Create a Blob with explicit encoding
            const blob = new Blob([new Uint8Array([0xEF, 0xBB, 0xBF]), csvContent], {
                type: 'text/csv;charset=utf-8-sig'
            });

            // Create download link with encoding preservation
            const link = document.createElement('a');
            if (link.download !== undefined) {
                const url = URL.createObjectURL(blob);
                link.setAttribute('href', url);
                link.setAttribute('download', 'data.csv');
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
            }
        } catch (error) {
            console.error('Error exporting CSV:', error);
            alert('Failed to export CSV. Please try again.');
        }
    }
}