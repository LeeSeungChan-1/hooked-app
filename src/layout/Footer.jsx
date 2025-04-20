// Footer.jsx
import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';
import Grid from '@mui/material/Grid';

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: 'primary.main',
                color: 'white',
                py: 3,
                mt: 'auto',
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={2} justifyContent="space-between">
                    {/* 왼쪽 영역: 연락처 정보 */}
                    <Grid size={{xs:12, md:6}}>
                        <Typography variant="h6" gutterBottom>
                            연락처
                        </Typography>
                        <Typography variant="body1">
                            이메일:{' '}
                            <Link href="mailto:seungchan753@naver.com" color="inherit" underline="hover">
                                seungchan753@naver.com
                            </Link>
                        </Typography>
                        <Typography variant="body1">
                            전화번호:{' '}
                            <Link href="tel:01028447391" color="inherit" underline="hover">
                                010-2844-7391
                            </Link>
                        </Typography>
                    </Grid>
                    {/* 오른쪽 영역: 이용약관 및 저작권 */}
                    <Grid size={{xs:12, md:6}} sx={{ textAlign: { xs: 'left', md: 'right' } }}>
                        <Box sx={{ mb: 1 }}>
                            <Link href="/terms" color="inherit" underline="hover" sx={{ mr: 2 }}>
                                이용약관
                            </Link>
                            <Link href="/privacy" color="inherit" underline="hover">
                                개인정보처리방침
                            </Link>
                        </Box>
                        <Typography variant="body2">
                            © 2025 hooked.kr All rights reserved.
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Footer;
