import React from 'react';
import { Stack, Button } from '@mui/material';

function Page({ serverData, moveToList }) {
    return (
        <Stack direction="row" spacing={1} justifyContent="center" sx={{ m: 2 }}>
            {/* 이전 페이지 버튼 */}
            {serverData.hasPreviousPage && (
                <Button
                    variant="outlined"
                    onClick={() => moveToList({ page: serverData.prevPage })}
                >
                    Prev
                </Button>
            )}

            {/* 페이지 번호 리스트 */}
            {serverData.pageNumber.map((num) => (
                <Button
                    key={num}
                    variant={num === serverData.currentPage ? "contained" : "outlined"}
                    onClick={() => moveToList({ page: num })}
                >
                    {num}
                </Button>
            ))}

            {/* 다음 페이지 버튼 */}
            {serverData.hasNextPage && (
                <Button
                    variant="outlined"
                    onClick={() => moveToList({ page: serverData.nextPage })}
                >
                    Next
                </Button>
            )}
        </Stack>
    );
}

export default Page;
