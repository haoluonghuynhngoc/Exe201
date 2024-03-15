"use client";
import styles from "./pagination.module.css"
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Pagination = ({ hasPreviousPage, hasNextPage }) => {
    const searchParams = useSearchParams();
    const { replace } = useRouter();
    const pathname = usePathname();
    const page = searchParams.get("page") || 1;
    const params = new URLSearchParams(searchParams);
    const handleChangePage = (type) => {
        type === "prev"
            ? params.set("page", parseInt(page) - 1)
            : params.set("page", parseInt(page) + 1);
        replace(`${pathname}?${params}`);
    };
    return (
        <div className={styles.container}>
            <button
                className={styles.button}
                disabled={!hasPreviousPage}
                onClick={() => handleChangePage("prev")}
            >
                Previous
            </button>
            <button
                className={styles.button}
                disabled={!hasNextPage}
                onClick={() => handleChangePage("next")
                }
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;