import { Box, Stack } from '@mui/material';
import CardContainer from './CardContainer';
import { getDailyTasks, getAllTasks } from '../../../../lib/fetch';
import Notes from './Notes';

async function CheckList({ params }: { params: Promise<{ slug: string }> }) {
  const allTasks = await getAllTasks();
  const dailyTasks = await getDailyTasks();
  const slug = (await params).slug;

  return (
    <Box
      sx={{
        marginTop: '50px',
        width: '100vw',
        p: '12px',
        paddingBottom: '20px',
      }}
    >
      <Stack
        width={"100%"}
        justifyContent={'space-between'}
        alignItems={'start'}
      >
        <Stack justifyContent={'space-start'} alignItems={'center'}>
          {slug === 'Monthly' && <Notes />}
        </Stack>

        { <CardContainer data={[...allTasks,...dailyTasks]} />}
     
      </Stack>
    </Box>
  );
}
export default CheckList;
