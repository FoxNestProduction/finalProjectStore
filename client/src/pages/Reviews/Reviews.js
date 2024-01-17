/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState, useRef, createRef, memo } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { Typography, Button, Box, Container, useMediaQuery } from '@mui/material';
import { useTranslation } from 'react-i18next';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import useGetAPI from '../../customHooks/useGetAPI';
import ReviewItem from '../../components/ReviewItem/ReviewItem';
import NewReview from '../../components/NewReview/NewReview';
import { openModal, setTitle, setContent, setButtonAgree, addButtonBox, closeModal } from '../../redux/slices/modalSlice';
import { addNewReview, resetReviewState, searchReviews, setNewReview } from '../../redux/slices/reviewsSlice';
import { TitleBtn, commentItem, commentItemSkeleton, commentList, container, flexCenter, titleContainer } from './styles';
import useAlert from '../../customHooks/useAlert';
import CustomAlert from '../../components/Alert/Alert';
import Skeleton from '../../components/Skeleton/Skeleton';

const ReviewsPage = () => {
  const searchReview = useSelector((state) => state.reviews.search);
  const indexSearchReview = useSelector((state) => state.reviews.indexSearch);
  const { i18n, t } = useTranslation();
  const loadingReviews = 3;
  const counScrollReview = 6 + Math.floor((indexSearchReview - 2) / 3) * 3;
  const [perPage, setPerPage] = useState(!indexSearchReview ? loadingReviews : counScrollReview);
  const [startPage, setStartPage] = useState(1);
  const [data, loading, error] = useGetAPI(`/comments/filter?startPage=${startPage}&perPage=${perPage}&sort=-date`);
  const [reviews, setReviews] = useState([]);
  const [isRendered, setIsRendered] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [loadMore, setLoadMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [reviewAlert, setReviewAlert] = useState(false);

  const dispatch = useDispatch();
  const newReview = useSelector((state) => state.reviews.newReview, shallowEqual);
  const isUserAuthorized = useSelector((state) => state.authorization.isUserAuthorized);
  const isLgTablet = useMediaQuery('(min-width: 690px)');
  const { alert, handleShowAlert, handleCloseAlert } = useAlert();

  const containerRef = useRef(null);
  const cardRef = useRef([]);
  const prevDataRef = useRef();
  // прослуховування скрола для дозавантаження відгуків
  useEffect(() => {
    const handleScroll = () => {
      const screenHeight = window.innerHeight;
      const containerRect = containerRef.current?.getBoundingClientRect();
      if (containerRect && containerRect.bottom - 330 < screenHeight && !isLoading) {
        setIsLoading(true);
        setPerPage(loadingReviews);
        setStartPage(searchReview !== ''
          ? startPage + Math.ceil(counScrollReview / loadingReviews)
          : startPage + 1);
      }
    };
    if (!loadMore) {
      window.removeEventListener('scroll', handleScroll);
    } else {
      window.addEventListener('scroll', handleScroll);
    }
  }, [isLoading, startPage, loadMore, searchReview, perPage, counScrollReview]);

  // додавання і рендеринг нових відгуків, якщо виконуються умови
  useEffect(() => {
    if (prevDataRef.current !== data && !loading) {
      setIsLoading(false);
      if (data?.comments && loadMore) {
        if (reviews.length > 0) {
          setReviews([...reviews, ...data.comments]);
        } else {
          setReviews(data.comments);
        }
        cardRef.current = data?.comments.map(() => createRef());
        setIsLoading(false);
        setIsRendered(true);
        prevDataRef.current = data;
      }
    }
    if (reviews.length >= data?.commentsQuantity) {
      setLoadMore(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.comments, startPage, loading, loadMore]);

  const handleSendFeedback = () => {
    dispatch(addNewReview());
    dispatch(resetReviewState());
    dispatch(closeModal());
    handleShowAlert();
    setReviewAlert(true);
    setTimeout(() => {
      setReviewAlert(false);
    }, 4000);
  };
  // якщо відгук пустий кнопка Send  неактивна
  useEffect(() => {
    if (newReview.content && newReview.content !== '') {
      dispatch(setButtonAgree({
        text: 'Send',
        endIcon: true,
        disabled: false,
        onClick: handleSendFeedback,
      }));
    } else {
      dispatch(resetReviewState());
      dispatch(setButtonAgree({
        text: 'Send',
        endIcon: true,
        disabled: true,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newReview]);

  const handleOpenModalReview = () => {
    if (isRendered) {
      dispatch(openModal());
      dispatch(setTitle(t('reviewsPage.titleNewReview')));
      dispatch(setContent(
        <NewReview />,
      ));
      dispatch(resetReviewState());
      dispatch(setButtonAgree({
        text: t('reviewsPage.buttonSend'),
        endIcon: true,
        disabled: newReview.content === '',
      }));
      dispatch(addButtonBox(true));
    }
  };

  // Додавання нового відгуку
  useEffect(() => {
    if (newReview && reviews.length > 0) {
      setReviews([newReview, ...reviews]);
    } else {
      setNewReview(newReview);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newReview.customer]);

  // скрол екрана до searchReview
  useEffect(() => {
    if (searchReview && cardRef.current.length > 0) {
      const element = containerRef.current.querySelector(`[data="${searchReview}"]`);
      const scrollScreen = () => {
        if (element && !isScrolling.current) {
          const elementPosition = element.getBoundingClientRect().top;
          window.scrollTo({
            top: window.scrollY + elementPosition - 110,
            behavior: 'smooth',
          });
        }
      };
      scrollScreen();
      setIsScrolling(true);
    }
    if (isScrolling) {
      dispatch(searchReviews(''));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRendered, searchReview, cardRef.current.length]);

  return (
    <Container component="section" sx={{ ...flexCenter, ...container }}>
      {reviewAlert && alert && (
        <CustomAlert type="success" handleCloseAlert={handleCloseAlert} content="Thank you! Your comment is added" />
      )}
      <Box sx={titleContainer}>
        <Typography variant="h2" sx={{ justifySelf: 'center' }}>{t('reviewsPage.title')}</Typography>
        {isUserAuthorized && (
          <Button variant="standard" sx={TitleBtn} onClick={handleOpenModalReview}>
            {isLgTablet && <Typography mr={1}>{t('reviewsPage.buttonCreate')}</Typography>}
            <AddCircleOutlineIcon />
          </Button>
        )}
      </Box>
      <Box ref={containerRef} sx={commentList}>
        {reviews && reviews.map((item, index) => (
          item.customer && (
            <Box
              key={item._id}
              data={item._id}
              ref={cardRef.current[index]}
              sx={commentItem}
            >
              <ReviewItem review={item} />
            </Box>
          )
        ))}
      </Box>
      {loading && (
        <>
          <Box
            sx={commentItemSkeleton}
          >
            <Skeleton />
          </Box>
          <Box
            sx={commentItemSkeleton}
          >
            <Skeleton />
          </Box>
          <Box
            sx={commentItemSkeleton}
          >
            <Skeleton />
          </Box>
        </>
      )}
      {error && <div>{error.statusText}</div>}
    </Container>
  );
};

export default memo(ReviewsPage);
