import link from 'linkvertise.js';
import fetch from 'node-fetch';

export class LinkvertiseService {
  private linkvertise: any;
  private authToken: string;

  constructor() {
    this.linkvertise = new link(process.env.LINKVERTISE_USER_ID);
    this.authToken = process.env.LINKVERTISE_AUTH_TOKEN;
  }

  async generateLink(targetUrl: string): Promise<string> {
    try {
      return await this.linkvertise.shrink(targetUrl);
    } catch (error) {
      console.error('Error generating Linkvertise link:', error);
      throw new Error('Failed to generate Linkvertise link');
    }
  }

  async verifyCompletion(hash: string): Promise<boolean> {
    try {
      const response = await fetch(
        `https://publisher.linkvertise.com/api/v1/anti_bypassing?token=${this.authToken}&hash=${hash}`,
        { method: 'POST' }
      );

      const data = await response.json();
      return data.status === true;
    } catch (error) {
      console.error('Error verifying Linkvertise completion:', error);
      return false;
    }
  }
}