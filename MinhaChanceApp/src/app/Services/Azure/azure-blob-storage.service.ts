import { Injectable } from '@angular/core';
import { BlobServiceClient, ContainerClient } from '@azure/storage-blob';

@Injectable({
  providedIn: 'root'
})
export class AzureBlobStorageService {

  accountName: string = '';

  constructor() { }



  public uploadFile(sas: string, content: Blob | undefined, name: string, containerName: string, handler: () => void) {

    if (content != undefined) {
      const blockBlobClient = this.containerClient(sas, containerName).getBlockBlobClient(name);
      blockBlobClient.uploadData(content, { blobHTTPHeaders: { blobContentType: content?.type } }).then(() => handler());
    }

  }

  public getFile(sas: string, containerName?: string, fileName?: string, id?: number | undefined): string {
    let token = "";
    if (sas)
      token = sas;


    const getBlobFileURI = `https://${this.accountName}.blob.core.windows.net?${token}/${containerName}/${fileName}/${id}`;

    return getBlobFileURI;

  }

  public deleteFile(sas: string, name: string, containerName: string | undefined, handler: () => void): void {

    const blockBlobClient = this.containerClient(sas, containerName).deleteBlob(name).then(() => {
      handler();
    });


  }

  private containerClient(sas?: string, containerName?: string): ContainerClient {
    let token = "";
    if (sas)
      token = sas;

    return new BlobServiceClient(`https://${this.accountName}.blob.core.windows.net?${token}`).getContainerClient(containerName ?? ''); //passar url por json
  }
}
