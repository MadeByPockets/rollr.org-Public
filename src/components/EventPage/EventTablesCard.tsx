"use client"
import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import TablesScrollableList from '@/components/SearchPage/TablesScrollableList';
import { TagsFormat } from '@/mocks/Tags';
import {SearchResultItem} from "@/mocks/SearchResults";

export interface EventTablesCardProps {
  tables: SearchResultItem[];
  tags: TagsFormat[];
  maxHeight?: number | string;
  onTableClick?: (id: number) => void;
}

/**
 * Event page card that shows a scrollable list of tables, reusing search result cards.
 */
const EventTablesCard: React.FC<EventTablesCardProps> = ({
  tables,
  tags,
  maxHeight = 450,
  onTableClick,
}) => {
  return (
    <Card elevation={6} sx={{ width: '100%', boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.15)' }}>
      <CardHeader title="Tables" />
      <Divider />
      <CardContent>
        <TablesScrollableList results={tables} tags={tags} maxHeight={maxHeight} onResultClick={onTableClick} />
      </CardContent>
    </Card>
  );
};

export default EventTablesCard;
