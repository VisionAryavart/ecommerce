// app/layout.js
import './globals.css';
import { Layout } from '@/components';
import { StateContext } from '@/context/StateContext';
import {Toaster} from 'react-hot-toast';

export const metadata = {
  title: 'Your App Title',
  description: 'Your App Description',
};

export default function RootLayout({ children }) {
  return (
    <StateContext>
    <html lang="en">
      <body>
        <Layout>
          <Toaster/>
          {children}
        </Layout>
      </body>
    </html>
    </StateContext>
  );
}
