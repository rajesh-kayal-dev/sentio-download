import axios from 'axios';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:8080';

export const githubRedirect = (req, res) => {
  const params = new URLSearchParams({
    client_id: GITHUB_CLIENT_ID,
    scope: 'user:email',
    allow_signup: 'true',
  });
  res.redirect(`https://github.com/login/oauth/authorize?${params}`);
};

export const githubCallback = async (req, res) => {
  const { code } = req.query;

  if (!code) {
    return res.redirect(`${FRONTEND_URL}/login?error=github_no_code`);
  }

  try {
    const tokenRes = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
        code,
      },
      { headers: { Accept: 'application/json' } }
    );

    const accessToken = tokenRes.data.access_token;

    if (!accessToken) {
      return res.redirect(`${FRONTEND_URL}/login?error=github_token_failed`);
    }

    const [profileRes, emailsRes] = await Promise.all([
      axios.get('https://api.github.com/user', {
        headers: { Authorization: `Bearer ${accessToken}` },
      }),
      axios.get('https://api.github.com/user/emails', {
        headers: { Authorization: `Bearer ${accessToken}` },
      }),
    ]);

    const profile = profileRes.data;

    const primaryEmailObj = emailsRes.data.find((e) => e.primary && e.verified);
    const email = primaryEmailObj?.email || profile.email;

    if (!email) {
      return res.redirect(`${FRONTEND_URL}/login?error=github_no_email`);
    }

    let user = await User.findOne({ $or: [{ githubId: String(profile.id) }, { email }] });

    if (user) {
      if (!user.githubId) {
        user.githubId = String(profile.id);
        user.authProvider = 'github';
        if (!user.avatar && profile.avatar_url) user.avatar = profile.avatar_url;
        await user.save();
      }
    } else {
      user = await User.create({
        name: profile.name || profile.login,
        email,
        avatar: profile.avatar_url || '',
        githubId: String(profile.id),
        authProvider: 'github',
      });
    }

    const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    const userData = encodeURIComponent(
      JSON.stringify({
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
      })
    );

    res.redirect(`${FRONTEND_URL}/login?token=${jwtToken}&user=${userData}`);
  } catch (error) {
    console.error('GitHub OAuth error:', error.message);
    res.redirect(`${FRONTEND_URL}/login?error=github_auth_failed`);
  }
};
