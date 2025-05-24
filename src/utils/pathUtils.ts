/**
 * Constrói o caminho absoluto para um asset.
 * Se relativePath não for fornecido ou for uma string vazia, retorna o BASE_URL.
 * @param relativePath - Opcional. O caminho relativo para o asset (ex: 'texts/meu-arquivo.txt').
 * @returns O caminho completo para o asset ou o BASE_URL.
 */
export const getPublicAssetUrl = (relativePath?: string): string => {
    const baseUrl: string = import.meta.env.BASE_URL;
    if (!relativePath) {
        return baseUrl;
    }

    const pathWithoutLeadingSlash = relativePath.startsWith('/')
        ? relativePath.substring(1)
        : relativePath;

    return `${baseUrl}${pathWithoutLeadingSlash}`;
};