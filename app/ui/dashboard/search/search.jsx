import styles from './search.module.css';
import {
    MdSearch
} from 'react-icons/md';
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

const Search = ({ placeholder }) => {
    const searchParams = useSearchParams();
    const { replace } = useRouter();
    const pathname = usePathname();
    const handleSearch = useDebouncedCallback((e) => {
        const params = new URLSearchParams(searchParams);
        params.set("PageNumber", 1);
        if (e.target.value) {
            e.target.value.length > 1 && params.set("name", e.target.value);
        }
        else {
            params.delete("name");
        }
        replace(`${pathname}?${params}`);
    }, 1000);

    return (
        <div className={styles.container}>
            <MdSearch />
            <input type="text" placeholder={placeholder} className={styles.input} onChange={handleSearch} />
        </div>
    )
}
export default Search;