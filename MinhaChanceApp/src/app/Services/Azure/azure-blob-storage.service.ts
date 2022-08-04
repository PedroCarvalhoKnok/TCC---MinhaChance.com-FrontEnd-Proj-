import { Injectable } from '@angular/core';
import { BlobServiceClient, ContainerClient } from '@azure/storage-blob';

@Injectable({
  providedIn: 'root'
})
export class AzureBlobStorageService {

  accountName: string = '';

  constructor() { }

  public uploadPDFFile(sas: string, content: Blob, name: string, handler: () => void){

    const blockBlobClient = this.containerClient(sas, 'CoursesPDFs').getBlockBlobClient(name);
    blockBlobClient.uploadData(content, { blobHTTPHeaders: {blobContentType: content.type}}).then(() => handler());


  }

  public uploadVideoFile(sas: string, content: Blob, name: string, handler: () => void){

    const blockBlobClient = this.containerClient(sas, 'CoursesVideos').getBlockBlobClient(name);
    blockBlobClient.uploadData(content, { blobHTTPHeaders: {blobContentType: content.type}}).then(() => handler());

    
  }

  private containerClient(sas?: string, containerName?: string): ContainerClient{
    let token = "";
    if(sas)
      token = sas;

    return new BlobServiceClient(`https://${this.accountName}.blob.core.windows.net?${token}`).getContainerClient(containerName ?? ''); //passar url por json
  }
}
