export const sendEmail = async (options) => {
  console.log(`[Email Service Mock] Sending email to ${options.to}`);
  console.log(`[Email Service Mock] Subject: ${options.subject}`);
  return true;
};
