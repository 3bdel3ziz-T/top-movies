export type ToastMsg = {
  id?: string;
  remove?: boolean;
  type: 'ERROR' | 'SUCCESS';
  title: string;
  body: string;
}