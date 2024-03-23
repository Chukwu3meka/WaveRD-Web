import Link from "next/link";
import Icon from "@mui/material/Icon";

import { styles } from ".";
import { List, ListItemText, ListItemButton, ListItemIcon, Grid } from "@mui/material";
import { CategoriesViewProps } from "interfaces/components/apihub.interface";

const CategoriesView = ({ showMenu, categories, displayHeader }: CategoriesViewProps) =>
  showMenu ? (
    <aside className={styles.categories} style={{ top: displayHeader ? "var(--headerHeight)" : "-10px" }}>
      {categories?.map(({ title, _id, icon }) => (
        <Link href={_id} key={_id}>
          <List component="nav" aria-labelledby="nested-list-subheader" sx={{ width: "100%" }}>
            <ListItemButton>
              <ListItemIcon>
                <Icon>{icon}</Icon>
              </ListItemIcon>
              <ListItemText primary={title} />
            </ListItemButton>
          </List>
        </Link>
      ))}
    </aside>
  ) : null;

export default CategoriesView;
