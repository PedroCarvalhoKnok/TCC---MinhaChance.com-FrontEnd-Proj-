import { Injectable } from '@angular/core';
import { BlobServiceClient, ContainerClient } from '@azure/storage-blob';

@Injectable({
  providedIn: 'root'
})
export class AzureBlobStorageService {

  accountName: string = '';

  constructor() { }

  

  public uploadFile(sas: string, content: Blob, name: string,containerName: string, handler: () => void){

    const blockBlobClient = this.containerClient(sas, containerName).getBlockBlobClient(name);
    blockBlobClient.uploadData(content, { blobHTTPHeaders: {blobContentType: content.type}}).then(() => handler());
    
  }

  public getFile(sas: string, containerName?: string, fileName?: string, courseId?: number, sessionId?: number| undefined): string{
    let token = "";
    if(sas)
      token = sas;

    
    const getBlobFileURI = sessionId != undefined ? `https://${this.accountName}.blob.core.windows.net?${token}/${containerName}/${fileName}/${courseId}/${sessionId}`: `https://${this.accountName}.blob.core.windows.net?${token}/${containerName}/${fileName}/${courseId}`;

    return getBlobFileURI;

  }

  public deleteFile(sas: string, content: Blob, name: string, containerName: string, handler: () => void): void{

    const blockBlobClient = this.containerClient(sas).deleteBlob(name).then(() => {
      handler();
    });
   
    
  }

  private containerClient(sas?: string, containerName?: string): ContainerClient{
    let token = "";
    if(sas)
      token = sas;

    return new BlobServiceClient(`https://${this.accountName}.blob.core.windows.net?${token}`).getContainerClient(containerName ?? ''); //passar url por json
  }
}
