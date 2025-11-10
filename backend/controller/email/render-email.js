const render_email = (name) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Report Approved</title>
  <style>
    body {
      font-family: 'Segoe UI', Arial, sans-serif;
      background-color: #E1E1E1;
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .card {
      background: #ffffff;
      border: 1px solid #FDBC64;
      border-radius: 16px;
      box-shadow: 0 6px 20px rgba(0,0,0,0.08);
      max-width: 600px;
      width: 90%;
      padding: 30px 25px;
      text-align: center;
      border-top: 6px solid #FDBC64;
      animation: fadeIn 0.8s ease;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    h1 {
      color: #000000;
      font-size: 26px;
      margin: 10px 0;
    }

    p {
      color: #666666;
      font-size: 15px;
      margin: 0px 0 0px;
    }

    .highlight {
      background: #ede7ff;
      color: #0273EA;
      font-weight: 600;
      padding: 4px 10px;
      border-radius: 8px;
      display: inline-block;
      margin: 10px 0;
    }

    .button {
      display: inline-block;
      margin-top: 40px;
      padding: 12px 28px;
      background: #FDBC64;
      color: #FFFFFF;
      text-decoration: none;
      font-weight: bold;
      border-radius: 25px;
      transition: 0.3s;
    }

    .button:hover {
      background: #FDBC64;
      transform: translateY(-2px);
    }

    .footer {
      margin-top: 25px;
      font-size: 13px;
      color: #999999;
    }
  </style>
</head>
<body>
  <div class="card">
    <h1>All Set, ${name}!</h1>
    <p>Your <span class="highlight">Report Document</span> has been fully approved!</p>
    <p>You can now download the approved report document or keep it for your records.</p>

    <a href="#" class="button">View Report</a>

    <div class="footer">
      Thank you for your cooperation and stay safe!<br>
    </div>
  </div>
</body>
</html>
    `;
};

export default render_email;
