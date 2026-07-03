export class DocumentService {
  public async uploadDocument() {
    return {
      message: "Upload endpoint is ready.",
      data: null,
    };
  }
}

export const documentService = new DocumentService();