import geoip from 'geoip-lite';
const { UAParser } = await import('ua-parser-js');

export const getClientInfo = async (req) => {
  const ip =
    req.headers['x-forwarded-for']?.split(',')[0] ||
    req.connection?.remoteAddress ||
    req.socket?.remoteAddress ||
    '';

  const parser = new UAParser(req.headers['user-agent'] || '');
  const result = parser.getResult();

  const geo = geoip.lookup(ip);
  const country = geo?.country || 'Unknown';

  return {
    ip: ip || 'unknown', // ✅ Ensure IP is at least a string
    browser: result.browser.name || 'Unknown',
    platform: result.os.name || 'Unknown',
    country
  };
};
