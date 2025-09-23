import TablePageLayout from "@/components/TablePage/TablePageLayout";
import {Tables} from "@/mocks/Tables"
import {Tags} from "@/mocks/Tags";


const TablePage = () => {
    return (
        <TablePageLayout table={Tables[0]} allTags={Tags}/>
    )
}

export default TablePage