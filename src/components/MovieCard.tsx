import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import styled from "@emotion/styled";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postAddFavorite } from "../api";

type Props = {
  poster: string;
  title: string;
  release: string;
  overview: string;
  vote: number;
  id: number;
};

const DetailWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2000;
`;

const Dimm = styled.div`
  background-color: rgba(0, 0, 0, 0.8);
  width: 100%;
  height: 100%;
`;

const MovieCard = ({ poster, title, release, overview, vote, id }: Props) => {
  const [visible, setVisible] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);

  const queryClient = useQueryClient();

  const handleDetail = () => {
    setOpenDetail(!openDetail);
  };

  const { mutate } = useMutation({
    mutationKey: ["add-favorite"],
    mutationFn: () => postAddFavorite("movie", id, true),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ["favorite-list"],
      });
      window.alert("좋아요가 추가되었습니다.");
    },
  });

  return (
    <div
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      <Card sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          image={poster}
          onClick={() => {
            handleDetail();
          }}
          sx={{ cursor: "pointer" }}
        />
        <CardContent>
          <Typography variant="body1">{title}</Typography>
          <Typography variant="body2">{release}</Typography>
          {visible && (
            <Box
              sx={{
                position: "absolute",
                bottom: "40px",
                right: "10px",
                cursor: "pointer",
              }}
              onClick={(e) => {
                e.preventDefault();
                mutate();
              }}
            >
              <FavoriteIcon />
            </Box>
          )}
        </CardContent>
      </Card>
      {openDetail && (
        <DetailWrap>
          <Dimm
            onClick={(e) => {
              e.preventDefault();
              handleDetail();
            }}
          >
            <Card
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
                width: "500px",
                height: "auto",
              }}
            >
              <CardContent>
                <CardMedia component="img" image={poster} />
                <Typography variant="h6">{title}</Typography>
                <Typography variant="subtitle1">상영일 : {release}</Typography>
                <Typography variant="subtitle1">평점 : {vote}</Typography>
                <Typography variant="body2">{overview}</Typography>
              </CardContent>
            </Card>
          </Dimm>
        </DetailWrap>
      )}
    </div>
  );
};

export default MovieCard;
