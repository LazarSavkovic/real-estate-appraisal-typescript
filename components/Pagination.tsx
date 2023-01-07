import _ from "lodash";
import { FC } from "react";

interface PaginationProps {
    items: number,
    pageSize: number,
    currentPage: number,
    onPageChange: Function
}



const Pagination: FC<PaginationProps> = ({ items, pageSize, currentPage, onPageChange }: PaginationProps) => {
    const pageCount = items / pageSize;
    if (Math.ceil(pageCount) === 1) return null;
    const pages = _.range(1, pageCount + 1);

    const pageWindow = []

    for (let i = currentPage - 3; i < pageCount; i++) {
        if ((i > 0) && (pageWindow.length < 7)) {
            pageWindow.push(i)
        }
    }
    return (
        <>
            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm flex justify-center" aria-label="Pagination">
                <a key={'Prethodna'}
                    onClick={() => onPageChange(currentPage - 1)}
                    style={{ cursor: "pointer" }}
                    className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
                >Prethodna
                </a>



                {pageWindow.map((page) => (

                    <a key={page}
                        onClick={() => onPageChange(page)}
                        style={{ cursor: "pointer" }}
                        className={page === currentPage ? "relative z-10 inline-flex items-center border border-indigo-500 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600 focus:z-20" : "relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"}
                    >{page}
                    </a>
                ))}



                <a
                    key={'Sledeca'}
                    onClick={() => onPageChange(currentPage + 1)}
                    style={{ cursor: "pointer" }}

                    className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
                >Sledeca
                </a>
            </nav>
        </>
    );
};

export default Pagination;