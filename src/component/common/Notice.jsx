// Announcements.jsx
import React from 'react';
import {
    Box,
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Grid,
    Typography,
    Button,
    Chip,
} from '@mui/material';

// 예시 공지사항 데이터
const announcements = [
    {
        id: 1,
        title: "2025년 1분기 성과 발표",
        date: "2025-01-15",
        author: "홍길동",
        content:
            "각 부서별 주요 성과 및 목표 달성 결과를 발표합니다. 회사 전반의 전략과 예산 집행을 평가하는 중요한 회의입니다.",
        category: "성과",
    },
    {
        id: 2,
        title: "신규 ERP 기능 업데이트",
        date: "2025-02-20",
        author: "김철수",
        content:
            "시스템 개선 및 새로운 기능 추가가 완료되었습니다. 이번 업데이트는 사용자 경험과 데이터 처리 효율성을 개선합니다.",
        category: "업데이트",
    },
    {
        id: 3,
        title: "연말 감사 이벤트",
        date: "2025-12-01",
        author: "이영희",
        content:
            "올해의 노고를 격려하기 위해 전사 이벤트를 개최합니다. 직원 여러분의 많은 참여 부탁드립니다.",
        category: "이벤트",
    },
    {
        id: 4,
        title: "기타 공지사항",
        date: "2025-11-11",
        author: "관리자",
        content:
            "기타 공지사항 예시입니다. 세부 내용을 업데이트하세요.",
        category: "공지",
    },
];

function Notice() {
    return (
        <Box sx={{ maxWidth: 'lg', mx: 'auto', my: 4, p: 2 }}>
            <Typography variant="h4" component="h2" gutterBottom>
                공지사항
            </Typography>
            <Grid container spacing={3} alignItems="stretch">
                {announcements.map((item) => (
                    <Grid key={item.id} size={{xs:12, sm:6}}>
                        <Card
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                height: '100%',
                            }}
                        >
                            <CardHeader
                                title={item.title}
                                subheader={`${item.date} • ${item.author}`}
                                sx={{
                                    '& .MuiCardHeader-title': { fontWeight: 'bold' },
                                    '& .MuiCardHeader-subheader': { color: 'text.secondary' },
                                }}
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography variant="body2" color="text.secondary">
                                    {item.content}
                                </Typography>
                                <Box sx={{ mt: 1 }}>
                                    <Chip label={item.category} color="primary" size="small" />
                                </Box>
                            </CardContent>
                            <CardActions>
                                <Button size="small">자세히 보기</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default Notice;
