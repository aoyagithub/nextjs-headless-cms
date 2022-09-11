import { GA_ID, existsGaId } from 'libs/gtag'
import Head from 'next/head'

type Props = {
  title?: string
  description?: string
}

export const Meta: React.FC<Props> = ({ title, description }) => {
  const titleText = title ? `${title} - Next.js Headless CMS` : 'Next.js Headless CMS'
  const descriptionText = description
    ? `${description} - Next.js Headless CMS`
    : 'Next.js Headless CMS'
  return (
    <Head>
      <title>{titleText}</title>
      <meta charSet='utf-8' />
      <meta name='viewport' content='width=device-width,initial-scale=1' />
      <meta name='description' content={descriptionText} />
      <meta name='format-detection' content='telephone=no' />
      <meta name='robots' content='noindex, nofollow' />
      <meta property='og:title' content={titleText} />
      <meta property='og:description' content={descriptionText} />
      <meta property='og:image' content={`https://your-domain.com/`} />
      <meta property='og:url' content={`https://your-domain.com/images/your-domain.com`} />
      <link rel='icon' type='image/x-icon' href='/favicon.ico' />
      {
        // eslint-disable-next-line @next/next/no-page-custom-font
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&amp;display=swap'
        />
      }
      {/* Google Analytics */}
      {existsGaId && (
        <>
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_ID}', {
                    page_path: window.location.pathname,
                  });`,
            }}
          />
        </>
      )}
    </Head>
  )
}
