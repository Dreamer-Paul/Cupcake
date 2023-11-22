const { APP_SITENAME, APP_FOOTER_EXTRA } = import.meta.env; 

function Footer() {
  return (
    <footer className="pb-12">
      <div className="grid grid-cols-2 px-2 max-w-3xl mx-auto text-sm opacity-60">
        <p>{`© ${new Date().getFullYear()} ${APP_SITENAME}`}</p>
        {APP_FOOTER_EXTRA && <p className="text-right" dangerouslySetInnerHTML={{ __html: APP_FOOTER_EXTRA }} />}
      </div>
    </footer>
  );
}

export default Footer;
