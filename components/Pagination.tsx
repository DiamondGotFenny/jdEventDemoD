import { usePagination, DOTS } from './usePagination';
import styles from 'styles/pagination.module.css';
import Link from 'next/link';
type Props = {
  onPageChange: (page: number) => void;
  totalCount: number;
  siblingCount: number;
  currentPage: number;
  pageSize: number;
};
const Pagination: React.FC<Props> = (props: Props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
  } = props;
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }
  const onNext = (): void => {
    onPageChange(currentPage + 1);
  };
  const onPrevious = (): void => {
    onPageChange(currentPage - 1);
  };
  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <div
      className={`${styles['pagination-container']} ${styles['pagination-bar']}`}
    >
      <Link href={`/events?page=${currentPage - 1}`}>
        <a
          className={`${styles['pagination-item']} ${
            currentPage === 1 ? styles.disabled : ''
          }`}
          onClick={onPrevious}
        >
          <div className={`${styles['arrow']} ${styles['left']}`} />
        </a>
      </Link>

      {paginationRange.map((pageNumber) => {
        if (pageNumber === DOTS) {
          return (
            <div className={`${styles['pagination-item']} ${styles['dots']}`}>
              &#8230;
            </div>
          );
        }
        return (
          <Link key={pageNumber} href={`/events?page=${pageNumber}`}>
            <a
              className={`${styles['pagination-item']} ${
                pageNumber === currentPage ? styles.selected : ''
              }`}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </a>
          </Link>
        );
      })}
      <Link href={`/events?page=${currentPage + 1}`}>
        <a
          className={`${styles['pagination-item']} ${
            currentPage === lastPage ? styles.disabled : ''
          }`}
          onClick={onNext}
        >
          <div className={`${styles['arrow']} ${styles['right']}`} />
        </a>
      </Link>
    </div>
  );
};

export default Pagination;
