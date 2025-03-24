export type ToastMsg = {
  type: 'ERROR' | 'SUCCESS';
  title: string;
  body: string;
}