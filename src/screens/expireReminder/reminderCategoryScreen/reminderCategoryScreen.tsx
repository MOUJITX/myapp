import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import SpacingView from '../../../components/basic/SpacingView';
import CellGroup from '../../../components/basic/CellGroup';
import { Category } from '../../../components/expireReminder/CategoryFilter';

interface Props {
  selected: string;
  onSelect: (category: string) => void;
}

export const ReminderCategoryScreen = (props: Props) => {
  const [categories, setCategories] = useState<Category[]>([
    { label: '全部', value: 'all', isDefault: true },
    { label: '药品', value: 'medicine', isDefault: true },
    { label: '食物', value: 'food', isDefault: true },
  ]);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  // 处理分类选择
  const handleSelect = (value: string) => {
    props.onSelect(value);
  };

  // 添加新分类
  const addCategory = () => {
    if (newCategoryName.trim()) {
      const newCategory = {
        label: newCategoryName,
        value: newCategoryName.toLowerCase(),
        isDefault: false,
      };
      setCategories([...categories, newCategory]);
      setIsAdding(false);
      setNewCategoryName('');
    }
  };

  // 删除分类
  const deleteCategory = (value: string) => {
    setCategories(categories.filter(cat => cat.value !== value));
  };

  // 更新分类
  const updateCategory = () => {
    if (editingCategory && newCategoryName.trim()) {
      setCategories(
        categories.map(cat =>
          cat.value === editingCategory.value
            ? { ...cat, label: newCategoryName }
            : cat
        )
      );
      setIsAdding(false);
      setNewCategoryName('');
    }
  };

  return (
    <SpacingView>
      <CellGroup>
        {/* 现有分类列表 */}
        {categories.map((category, index) => (
          <View key={index} style={styles.listItem}>
            <TouchableOpacity
              style={styles.itemLeft}
              onPress={() => handleSelect(category.value)}
              onLongPress={() => {
                if (!category.isDefault) {
                  setEditingCategory(category);
                  setNewCategoryName(category.label);
                  setIsAdding(false);
                }
              }}
            >
              <Text style={styles.radioIcon}>
                {props.selected === category.value ? '✔' : '○'}
              </Text>
              {editingCategory?.value === category.value ? (
                <TextInput
                  style={styles.input}
                  value={newCategoryName}
                  onChangeText={setNewCategoryName}
                  onSubmitEditing={updateCategory}
                  autoFocus
                />
              ) : (
                <Text style={styles.itemText}>{category.label}</Text>
              )}
            </TouchableOpacity>

            {!category.isDefault &&
              editingCategory?.value !== category.value && (
                <TouchableOpacity
                  onPress={() => deleteCategory(category.value)}
                  style={styles.deleteButton}
                >
                  <Text style={styles.deleteIcon}>×</Text>
                </TouchableOpacity>
              )}
          </View>
        ))}

        {/* 添加分类区域 */}
        <View style={styles.listItem}>
          {isAdding ? (
            <View style={styles.addInputContainer}>
              <TextInput
                style={[styles.input, styles.flex1]}
                placeholder="输入分类名称"
                value={newCategoryName}
                onChangeText={setNewCategoryName}
                onSubmitEditing={addCategory}
                autoFocus
              />
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={addCategory}
              >
                <Text style={styles.buttonText}>保存</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => {
                setEditingCategory(null);
                setIsAdding(true);
              }}
            >
              <Text style={styles.addButtonText}>+ 添加新分类</Text>
            </TouchableOpacity>
          )}
        </View>
      </CellGroup>
    </SpacingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  itemLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  radioIcon: {
    color: '#4CAF50',
    fontSize: 24,
    marginRight: 16,
    width: 30,
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
  deleteButton: {
    padding: 8,
    marginLeft: 10,
  },
  deleteIcon: {
    color: '#ff4444',
    fontSize: 20,
  },
  addButton: {
    paddingVertical: 12,
    width: '100%',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: '500',
  },
  addInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    width: '100%',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#4CAF50',
    paddingVertical: 8,
    fontSize: 16,
    minWidth: 120,
  },
  confirmButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
  },
  flex1: {
    flex: 1,
  },
});
