import { Card, CardMedia } from '@mui/material';

const MessageImageCard = ({ title, imageUrl }: {title: string, imageUrl: string}) => {
    return(
        <Card sx={{ margin: 2, border: 1, borderColor: 'grey.300' }}>
            <CardMedia
            component="img"
            alt={title || 'Image'}
            image={imageUrl}
            title={title || 'Image'}
            />
      </Card>
    );
};

export default MessageImageCard;