import { Router } from "express";
import axios from "axios";

const router = Router();

router.get("/login", (req, res) => {
  const authUrl =
    `https://www.instagram.com/oauth/authorize` +
    `?enable_fb_login=0` +
    `&force_authentication=1` +
    `&client_id=${process.env.INSTAGRAM_APP_ID}` +
    `&redirect_uri=${encodeURIComponent(
      process.env.INSTAGRAM_REDIRECT_URI!
    )}` +
    `&response_type=code` +
    `&scope=instagram_business_basic,instagram_business_content_publish`;

  res.redirect(authUrl);
});

router.get("/callback", async (req, res) => {
  const code = req.query.code as string;

  if (!code) {
    return res.status(400).json({
      success: false,
      error: "Authorization code missing",
    });
  }

  try {
    const formData = new URLSearchParams();

    formData.append(
      "client_id",
      process.env.INSTAGRAM_APP_ID!
    );

    formData.append(
      "client_secret",
      process.env.INSTAGRAM_APP_SECRET!
    );

    formData.append(
      "grant_type",
      "authorization_code"
    );

    formData.append(
      "redirect_uri",
      process.env.INSTAGRAM_REDIRECT_URI!
    );

    formData.append(
      "code",
      code
    );

    const tokenResponse = await axios.post(
      "https://api.instagram.com/oauth/access_token",
      formData,
      {
        headers: {
          "Content-Type":
            "application/x-www-form-urlencoded",
        },
      }
    );

    const accessToken =
      tokenResponse.data.access_token;

    const userId =
      tokenResponse.data.user_id;

    const profileResponse = await axios.get(
      "https://graph.instagram.com/me",
      {
        params: {
          fields: "id,username",
          access_token: accessToken,
        },
      }
    );

    return res.json({
      success: true,
      instagramUserId: userId,
      username: profileResponse.data.username,
      accessToken,
    });
  } catch (error: any) {
    console.error(
      "Instagram OAuth Error:",
      error.response?.data || error.message
    );

    return res.status(500).json({
      success: false,
      error:
        error.response?.data || error.message,
    });
  }
});

export default router;