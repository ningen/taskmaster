import {Task} from '../types.js';

export const sampleTasks: Task[] = [
  {
    id: "TASK-001",
    title: "プロジェクト計画と要件定義",
    description: "プロジェクトの範囲、要件を定義し、詳細な計画を作成する",
    completed: true,
    priority: "high",
    createdAt: new Date("2025-01-15T00:00:00.000Z"),
    updatedAt: new Date("2025-01-31T10:00:00.000Z"),
    dueDate: new Date("2025-01-31T23:59:59.000Z"),
    category: "Work",
    status: "終了",
    statusHistory: [
      {
        status: "作成",
        timestamp: new Date("2025-01-15T00:00:00.000Z")
      },
      {
        status: "見積",
        timestamp: new Date("2025-01-16T09:00:00.000Z")
      },
      {
        status: "開始",
        timestamp: new Date("2025-01-17T09:00:00.000Z")
      },
      {
        status: "終了",
        timestamp: new Date("2025-01-31T10:00:00.000Z")
      }
    ],
    estimatedHours: 40,
    actualHours: 35,
    startDate: new Date("2025-01-15T00:00:00.000Z"),
    endDate: new Date("2025-01-31T23:59:59.000Z")
  },
  {
    id: "TASK-002",
    title: "UI/UXデザイン",
    description: "ワイヤーフレーム、モックアップ、デザインシステムを作成する",
    completed: false,
    priority: "high",
    createdAt: new Date("2025-02-01T00:00:00.000Z"),
    updatedAt: new Date("2025-02-25T14:30:00.000Z"),
    dueDate: new Date("2025-02-28T23:59:59.000Z"),
    category: "Work",
    status: "開始",
    statusHistory: [
      {
        status: "作成",
        timestamp: new Date("2025-02-01T00:00:00.000Z")
      },
      {
        status: "見積",
        timestamp: new Date("2025-02-02T09:00:00.000Z")
      },
      {
        status: "開始",
        timestamp: new Date("2025-02-03T09:00:00.000Z")
      }
    ],
    estimatedHours: 60,
    actualHours: 45,
    startDate: new Date("2025-02-01T00:00:00.000Z"),
    endDate: new Date("2025-02-28T23:59:59.000Z")
  },
  {
    id: "TASK-003",
    title: "フロントエンド開発",
    description: "ReactとTypeScriptを使用したレスポンシブフロントエンドの実装",
    completed: false,
    priority: "high",
    createdAt: new Date("2025-02-15T00:00:00.000Z"),
    updatedAt: new Date("2025-03-01T16:00:00.000Z"),
    dueDate: new Date("2025-03-31T23:59:59.000Z"),
    category: "Work",
    status: "開始",
    statusHistory: [
      {
        status: "作成",
        timestamp: new Date("2025-02-15T00:00:00.000Z")
      },
      {
        status: "見積",
        timestamp: new Date("2025-02-16T09:00:00.000Z")
      },
      {
        status: "開始",
        timestamp: new Date("2025-02-17T09:00:00.000Z")
      }
    ],
    estimatedHours: 120,
    actualHours: 48,
    startDate: new Date("2025-02-15T00:00:00.000Z"),
    endDate: new Date("2025-03-31T23:59:59.000Z")
  },
  {
    id: "TASK-004",
    title: "バックエンドAPI開発",
    description: "RESTful APIエンドポイントとデータベーススキーマの構築",
    completed: false,
    priority: "medium",
    createdAt: new Date("2025-02-10T00:00:00.000Z"),
    updatedAt: new Date("2025-03-01T11:00:00.000Z"),
    dueDate: new Date("2025-03-20T23:59:59.000Z"),
    category: "Work",
    status: "開始",
    statusHistory: [
      {
        status: "作成",
        timestamp: new Date("2025-02-10T00:00:00.000Z")
      },
      {
        status: "見積",
        timestamp: new Date("2025-02-11T09:00:00.000Z")
      },
      {
        status: "開始",
        timestamp: new Date("2025-02-12T09:00:00.000Z")
      }
    ],
    estimatedHours: 80,
    actualHours: 50,
    startDate: new Date("2025-02-10T00:00:00.000Z"),
    endDate: new Date("2025-03-20T23:59:59.000Z")
  },
  {
    id: "TASK-005",
    title: "コンテンツ管理システム",
    description: "コンテンツの更新と管理を容易にするCMSの統合",
    completed: false,
    priority: "medium",
    createdAt: new Date("2025-03-01T00:00:00.000Z"),
    updatedAt: new Date("2025-03-01T00:00:00.000Z"),
    dueDate: new Date("2025-03-25T23:59:59.000Z"),
    category: "Work",
    status: "見積",
    statusHistory: [
      {
        status: "作成",
        timestamp: new Date("2025-03-01T00:00:00.000Z")
      },
      {
        status: "見積",
        timestamp: new Date("2025-03-02T09:00:00.000Z")
      }
    ],
    estimatedHours: 50,
    actualHours: 0,
    startDate: new Date("2025-03-01T00:00:00.000Z"),
    endDate: new Date("2025-03-25T23:59:59.000Z")
  },
  {
    id: "TASK-006",
    title: "テストと品質保証",
    description: "単体テスト、統合テスト、ユーザー受入テストを含む包括的テスト",
    completed: false,
    priority: "high",
    createdAt: new Date("2025-03-15T00:00:00.000Z"),
    updatedAt: new Date("2025-03-15T00:00:00.000Z"),
    dueDate: new Date("2025-04-15T23:59:59.000Z"),
    category: "Work",
    status: "作成",
    statusHistory: [
      {
        status: "作成",
        timestamp: new Date("2025-03-15T00:00:00.000Z")
      }
    ],
    estimatedHours: 70,
    actualHours: 0,
    startDate: new Date("2025-03-15T00:00:00.000Z"),
    endDate: new Date("2025-04-15T23:59:59.000Z")
  },
  {
    id: "TASK-007",
    title: "SEOとパフォーマンス最適化",
    description: "検索エンジン最適化とページ読み込み速度の改善",
    completed: false,
    priority: "medium",
    createdAt: new Date("2025-03-25T00:00:00.000Z"),
    updatedAt: new Date("2025-03-25T00:00:00.000Z"),
    dueDate: new Date("2025-04-20T23:59:59.000Z"),
    category: "Work",
    status: "作成",
    statusHistory: [
      {
        status: "作成",
        timestamp: new Date("2025-03-25T00:00:00.000Z")
      }
    ],
    estimatedHours: 40,
    actualHours: 0,
    startDate: new Date("2025-03-25T00:00:00.000Z"),
    endDate: new Date("2025-04-20T23:59:59.000Z")
  },
  {
    id: "TASK-008",
    title: "デプロイとローンチ",
    description: "本番環境へのデプロイとローンチプランの実行",
    completed: false,
    priority: "high",
    createdAt: new Date("2025-04-15T00:00:00.000Z"),
    updatedAt: new Date("2025-04-15T00:00:00.000Z"),
    dueDate: new Date("2025-04-30T23:59:59.000Z"),
    category: "Work",
    status: "作成",
    statusHistory: [
      {
        status: "作成",
        timestamp: new Date("2025-04-15T00:00:00.000Z")
      }
    ],
    estimatedHours: 30,
    actualHours: 0,
    startDate: new Date("2025-04-15T00:00:00.000Z"),
    endDate: new Date("2025-04-30T23:59:59.000Z")
  }
];