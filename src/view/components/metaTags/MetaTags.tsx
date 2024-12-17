import {FC} from 'react';
import { Helmet } from 'react-helmet-async';

interface MetaTagsProps {
    title: string;
    description: string;
    image: string;
    url: string;
    }

export const MetaTags:FC<MetaTagsProps> = ({ 
  title, 
  description, 
  image, 
  url 
}) => {
  return (
    <Helmet>
      {/* Basic meta tags */}
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Open Graph / WhatsApp */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};